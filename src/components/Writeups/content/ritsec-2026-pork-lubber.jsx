export default function Ritsec2026PorkLubber() {
  return (
    <>
      <h2>Challenge Description</h2>
      <p>
        A pirate-themed prompt asks: in what U.S. state does the "land-lubber" live who was assigned the subnet
        containing <code>44.30.122.69</code>? The answer format is <code>RS&#123;two-letter state abbreviation&#125;</code>.
        Only 5 attempts are allowed, so brute forcing all 50 states directly is risky.
      </p>

      <h2>Approach 1: Brute Force (Against the Rules)</h2>
      <p>
        With only 5 attempts allowed and 50 possible state abbreviations, brute forcing on a single account
        is not viable. However, by creating multiple accounts, each with 5 attempts, it was possible to
        systematically try every state abbreviation until hitting the correct flag. This did work, but it
        violates the spirit of the challenge and would likely be considered against the rules.
      </p>

      <h2>Approach 2: Traceroute Analysis (Intended)</h2>
      <p>
        The IP address <code>44.30.122.69</code> falls in the <strong>44.0.0.0/8</strong> block, historically
        allocated to amateur radio operators (callsign prefix N4) by ARRL. Standard IP lookup tools often show
        outdated or region-level data for this range, so a more hands-on approach was needed.
      </p>

      <h3>Traceroute Analysis</h3>
      <p>
        Running <code>tracert 44.30.122.69</code> on Windows reveals the network path hop by hop. The output
        showed 30 hops max, with most of the later ones timing out. The key is to focus on the <em>last
        responding hops</em> before the timeouts, since those are geographically closest to the destination.
      </p>
      <p>Notable hops from the output:</p>
      <ul>
        <li><strong>Hops 1-5:</strong> NCSU private network (<code>10.x.x.x</code>, <code>ncstate.net</code>) -- ignored, internal infrastructure</li>
        <li><strong>Hop 8:</strong> <code>hntvi-gw-to-ws-gw.ncrern.net</code> -- NC Research and Education Network, still local</li>
        <li><strong>Hops 9-10:</strong> <code>Atlanta2.Level3.net</code> / <code>Atlanta2.net.lumen.tech</code> -- traffic routing through Atlanta, GA</li>
        <li><strong>Hop 13:</strong> <code>ae-17.a05.asbnva02.us.bb.gin.ntt.net</code> -- the last responding hop before all timeouts</li>
      </ul>

      <h3>Narrowing Down the State</h3>
      <p>
        The hostname on hop 13 was the deciding clue. The segment <code>asbnva02</code> encodes a location
        directly: <strong>asbn = Ashburn</strong>, <strong>va = Virginia</strong>. This is a common naming
        convention used by backbone providers like NTT to indicate the router's physical location. Since this
        was the last reachable hop before the destination went silent (hops 14-30 all timed out), VA was
        clearly the endpoint region.
      </p>
      <p>
        The three candidate states from the route were NC (local, ruled out), GA (intermediate routing hop),
        and VA (furthest reachable hop, closest to the target). VA was the answer.
      </p>

      <h2>Flag</h2>
      <pre><code>RS&#123;VA&#125;</code></pre>

      <h2>Takeaways</h2>
      <ul>
        <li>Traceroute is a powerful passive recon tool. The hop order tells a geographic story, and working backwards from the last reachable hop narrows down location quickly.</li>
        <li>Ignore private IP ranges (<code>10.x.x.x</code>, <code>172.16-31.x.x</code>, <code>192.168.x.x</code>) during traceroute analysis since they belong to internal infrastructure and don't reveal physical location.</li>
        <li>When a challenge limits your attempts, use process-of-elimination reasoning rather than guessing randomly. Geolocation clustering across multiple hops gives high confidence before submitting.</li>
        <li>The <code>44.0.0.0/8</code> block is an AMPRNet (Amateur radio) allocation, which can help contextualize why standard WHOIS lookups may not pinpoint a state directly.</li>
      </ul>
    </>
  )
}
