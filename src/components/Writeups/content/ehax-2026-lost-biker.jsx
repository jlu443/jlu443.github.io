export default function EhaxLostBiker() {
  return (
    <>
      <h2>Challenge Description</h2>
      <p>
        An OSINT challenge requiring us to track down a person's digital footprint across multiple platforms,
        uncovering hidden messages and decoding steganographic content along the way.
      </p>
      <blockquote>
        This challenge was <strong>not solved</strong> during the CTF due to multiple rabbit holes and fatigue,
        but the investigation path is documented here.
      </blockquote>

      <h2>Investigation Path</h2>

      <h3>Step 1: Username Discovery</h3>
      <p>
        We started by using <strong>IDCrawl</strong> to uncover a username associated with the target.
        This led us to a Twitter/X account: <code>@techmo29561</code>.
      </p>

      <h3>Step 2: Archived Twitter Posts</h3>
      <p>
        The Twitter account's posts were captured via the Wayback Machine. We pulled multiple archived tweets
        from the account using Wayback Machine URLs. The tweets appeared to contain encoded or non-English content
        that needed translation.
      </p>

      <h3>Step 3: Steganography in Text</h3>
      <p>
        After translating the tweets, we suspected hidden data in the text itself. Using{' '}
        <strong>Steg of the Dump</strong> (a text-based steganography tool), we extracted hidden content
        from the Twitter posts. This consistently revealed a username: <code>ryukendo777</code>.
      </p>

      <h3>Step 4: Reddit Account</h3>
      <p>
        Searching for <code>ryukendo777</code> on Reddit led to an account with several posts containing
        clues, including a <strong>fake flag</strong> designed to waste time. The Reddit posts included
        images that we investigated further.
      </p>

      <h3>Step 5: Image Analysis (Dead End)</h3>
      <p>
        We used Google Lens on the Reddit images to find connections, but these appeared to be
        <strong> red herrings</strong>. No meaningful connections were found through reverse image search.
      </p>

      <h3>Step 6: Hints Released</h3>
      <p>After the CTF released hints, the intended path became clearer:</p>
      <ol>
        <li><strong>"Look at the comments carefully"</strong>, meaning Reddit comments held key information</li>
        <li><strong>"Not a geographic map"</strong>, so the map-like content wasn't geographic</li>
        <li><strong>"Probably a sitemap"</strong>, suggesting it was a sitemap of some kind</li>
        <li><strong>"Reddit maps"</strong>, which pointed to Reddit's own mapping/navigation</li>
      </ol>
      <p>
        A comment on one of the Reddit posts mentioned: <em>"The old part of the city. I love living in the
        past and riding my bike. Osho garden is my favourite place."</em>, likely pointing to the final answer.
      </p>

      <h2>What We Learned</h2>
      <ul>
        <li>OSINT trails can span many platforms, and username pivoting from IDCrawl to Twitter to Reddit is a classic pattern.</li>
        <li>Text steganography is a real technique; tools like Steg of the Dump can hide usernames in plain-looking text.</li>
        <li>Not every lead is productive, so recognizing red herrings early saves energy for the real trail.</li>
        <li>Sometimes the solve is in the metadata (comments, sitemaps) rather than the primary content.</li>
      </ul>
    </>
  )
}
