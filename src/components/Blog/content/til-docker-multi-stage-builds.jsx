export default function TilDockerMultiStageBuilds() {
  return (
    <>
      <h2>The Problem</h2>
      <p>
        I had a Python ML service running inference with scikit-learn and FastAPI. The Docker image
        was built the straightforward way: install everything into one layer, copy the code, done.
        The result? A <strong>2.1GB image</strong> that took forever to push and pull.
      </p>

      <h2>The Fix: Multi-Stage Builds</h2>
      <p>
        Multi-stage builds let you use multiple <code>FROM</code> statements in a single Dockerfile.
        You compile or install dependencies in a "builder" stage, then copy only the artifacts you
        need into a slim final image.
      </p>

      <pre><code>{`# Stage 1: Build dependencies
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Runtime
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:\$PATH
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`}</code></pre>

      <h2>Results</h2>
      <ul>
        <li><strong>Before:</strong> 2.1GB (full python:3.11 + build tools + cached pip packages)</li>
        <li><strong>After:</strong> 420MB (python:3.11-slim + only runtime dependencies)</li>
        <li>CI/CD pipeline deploy time dropped from ~4 minutes to under 90 seconds</li>
      </ul>

      <h2>Gotchas</h2>
      <ol>
        <li>
          <strong>Missing system libraries.</strong> The slim image does not include packages like
          <code>libgomp1</code> that scikit-learn needs at runtime. I had to add a targeted
          <code>apt-get install</code> in the final stage for just those packages.
        </li>
        <li>
          <strong>User site-packages path.</strong> Using <code>pip install --user</code> puts
          everything under <code>/root/.local</code>, which is easy to copy across stages. Without
          the <code>--user</code> flag you end up copying the entire <code>/usr/local</code> tree,
          which defeats the purpose.
        </li>
        <li>
          <strong>.dockerignore matters.</strong> Without it, the <code>COPY . .</code> was pulling
          in <code>.git</code>, <code>__pycache__</code>, and local virtualenvs, adding hundreds of
          MB back.
        </li>
      </ol>

      <h2>Takeaway</h2>
      <p>
        Multi-stage builds are one of those things that take 10 minutes to set up and pay for
        themselves immediately. If you are shipping Python services in Docker and your images are
        over a gig, this is the first thing to try.
      </p>
    </>
  )
}
