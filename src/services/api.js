const API_URL = import.meta.env.VITE_API_URL || "";

async function request(endpoint, options = {}, includeAuth = true) {
  const token = includeAuth
    ? localStorage.getItem("access_token")
    : null;

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const isFormData = options.body instanceof FormData;

  if (options.body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = null;

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text ? { detail: text } : null;
  }

  if (!response.ok) {
    const message =
      data?.detail || data?.message || "خطایی در ارتباط با سرور رخ داده است";

    const error = new Error(
      typeof message === "string" ? message : "درخواست ناموفق بود",
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
}

const api = {
  get(endpoint) {
    return request(endpoint, {
      method: "GET",
    });
  },

  post(endpoint, body) {
    return request(endpoint, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  postGuest(endpoint, body) {
    return request(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
      false,
    );
  },

  async postStream(endpoint, body, onEvent) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let data = null;

      try {
        data = await response.json();
      } catch {
        // Ignore non-JSON error responses.
      }

      const message =
        data?.detail || data?.message || "ارتباط با سرور ناموفق بود.";

      const error = new Error(
        typeof message === "string" ? message : "درخواست ناموفق بود",
      );

      error.status = response.status;
      error.data = data;
      throw error;
    }

    if (!response.body) {
      throw new Error("مرورگر امکان دریافت پاسخ جریانی را ندارد.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    const dispatchEvents = async (flush = false) => {
      const blocks = buffer.split(/\r?\n\r?\n/);

      if (flush) {
        buffer = "";
      } else {
        buffer = blocks.pop();
      }

      for (const block of blocks) {
        if (!block.trim()) continue;

        let event = "message";
        let data = "";

        for (const line of block.split(/\r?\n/)) {
          if (line.startsWith("event:")) {
            event = line.slice(6).trim();
          } else if (line.startsWith("data:")) {
            data += line.slice(5).trim();
          }
        }

        if (!data) continue;

        let parsed;

        try {
          parsed = JSON.parse(data);
        } catch {
          throw new Error("پاسخ جریانی سرور معتبر نیست.");
        }

        await onEvent?.(event, parsed);
      }
    };

    try {
      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        await dispatchEvents();
      }

      buffer += decoder.decode();
      await dispatchEvents(true);
    } finally {
      reader.releaseLock();
    }
  },

  put(endpoint, body) {
    return request(endpoint, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },

  patch(endpoint, body) {
    return request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete(endpoint) {
    return request(endpoint, {
      method: "DELETE",
    });
  },
};

export default api;
