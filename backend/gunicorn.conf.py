import os

# Render injects PORT automatically; fall back to 5000 for local dev
bind = f"0.0.0.0:{os.environ.get('PORT', '5000')}"

# 2 workers per CPU core + 1 (standard formula for I/O-bound apps)
workers = 3

# Seconds a worker can be silent before being killed and restarted
timeout = 120

# Use gevent or gthread if you need async; default sync is fine for this app
worker_class = "sync"

# Log to stdout (Render captures stdout automatically)
accesslog = "-"
errorlog = "-"
loglevel = "info"
