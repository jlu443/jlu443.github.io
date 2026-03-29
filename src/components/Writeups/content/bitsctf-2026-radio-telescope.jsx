export default function BitsctfRadioTelescope() {
  return (
    <>
      <h2>Challenge Description</h2>
      <p>
        We're given a <code>log.txt</code> file that appears to be output from a radio telescope, just a wall of
        floating-point numbers with no obvious structure at first glance. The challenge context hints that
        something meaningful is hidden in all the noise.
      </p>

      <h2>Observation</h2>
      <p>
        Scrolling through the log, most numbers fluctuate wildly, which is typical noise. But scattered throughout
        the data, certain numbers appear to <strong>stay consistent</strong>, holding steady values while
        everything else around them shifts. These "clearings" in the noise stood out as intentional.
      </p>

      <h2>Approach</h2>
      <p>
        I wrote a Python script to programmatically identify these stable values, specifically numbers that remained
        constant or near-constant across the noisy data. The logic was straightforward:
      </p>
      <ol>
        <li>Parse the floating-point numbers from the log file</li>
        <li>Identify values that stayed consistent (the "clearings" in the noise)</li>
        <li>Collect these stable numbers in order</li>
        <li>Convert them to integers and then to ASCII characters</li>
      </ol>

      <h2>Result</h2>
      <p>
        The stable numbers mapped directly to ASCII character codes. Converting them in sequence
        spelled out the flag:
      </p>
      <pre><code>CTF{'{'}s1l3nc3_1n_th3_n01s3{'}'}</code></pre>
      <p>
        The flag itself is a nice nod to the challenge theme, <em>silence in the noise</em>, which is
        exactly how the data was structured.
      </p>

      <h2>Takeaways</h2>
      <ul>
        <li>When a challenge gives you noisy data, look for what <em>isn't</em> noisy, since stable values in chaos are usually the signal.</li>
        <li>A quick Python script to automate pattern detection beats manual inspection every time for large datasets.</li>
        <li>ASCII conversion is a classic CTF encoding, and it's always worth trying when you extract a sequence of integers in the printable range (32–126).</li>
      </ul>
    </>
  )
}
