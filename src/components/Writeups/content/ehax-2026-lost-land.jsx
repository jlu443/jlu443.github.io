export default function EhaxLostLand() {
  return (
    <>
      <h2>Challenge Description</h2>
      <p>
        We're given a set of clues about a mysterious location and need to determine the exact place
        and a specific route associated with it. The flag format hints at a transportation route and a stop name.
      </p>

      <h2>Key Clues</h2>
      <ul>
        <li><strong>Hot place during Christmas</strong>, which tells us we're in the <strong>Southern Hemisphere</strong>, where December is summer.</li>
        <li><strong>No trees around</strong>, pointing to a barren, treeless landscape in the Southern Hemisphere.</li>
      </ul>

      <h2>Solving Process</h2>
      <h3>Step 1: Narrowing the Location</h3>
      <p>
        A hot, treeless region in the Southern Hemisphere during Christmas narrows things down significantly.
        The word "Nullarbor" literally means <strong>"no trees"</strong> in Latin (<code>nullus arbor</code>).
        The Nullarbor Plain in southern Australia is one of the most desolate stretches of land on the continent;
        flat, arid, and virtually treeless for hundreds of kilometers.
      </p>

      <h3>Step 2: Finding the Stop</h3>
      <p>
        Along the Nullarbor Plain runs a famous railway. One of the stops on this route is <strong>Cook, South Australia</strong>,
        a near-ghost town with a population of just <strong>4 people</strong>. Cook exists almost entirely as a railway service point,
        making it a perfect obscure OSINT target.
      </p>

      <h3>Step 3: Identifying the Route</h3>
      <p>
        The railway that passes through Cook is the <strong>Indian Pacific</strong>, one of Australia's most iconic
        transcontinental rail routes. It runs from Sydney to Perth, crossing the entire width of the continent
        and passing directly through Cook on the Nullarbor Plain.
      </p>

      <h2>Approach</h2>
      <p>
        Given the finicky nature of the exact flag format, we used an AI-assisted brute force approach,
        feeding the geographic clues into Gemini to generate possible flag combinations with different
        formatting variations until we hit the correct one.
      </p>

      <h2>Flag</h2>
      <pre><code>EH4X{'{'}the_indian_pacific_cook{'}'}</code></pre>

      <h2>Takeaways</h2>
      <ul>
        <li>OSINT challenges often reward geographic and cultural knowledge, and "no trees" + "hot Christmas" is a strong signal for the Nullarbor.</li>
        <li>When the flag format is ambiguous, generating variations systematically can save time vs. guessing manually.</li>
        <li>Obscure locations with tiny populations (Cook, pop. 4) are classic OSINT targets.</li>
      </ul>
    </>
  )
}
