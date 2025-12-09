function About() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-6">About Leaf</h1>
      <div className="prose max-w-none">
        <img
          src="/images/jmrGlasses.jpeg"
          width={200}
          alt="Slightly blurry picture of smiling leaf with glasses and a plaid shirt."
          className="rounded shadow-lg mb-6"
        />
        <p>
          Hi! I'm Leaf. I like to mess around with acrylic and watercolor paints, Pigma Micron pens of various sizes, and Uni Posca paint pens.
        </p>
        <p>
          I also like paper. My go-to is 12x12" 110 lb cardstock that is smooth on one side and linen on the other, but my favorite is a good Bristol smooth. I've tried digital art, but it's just not the same. Something about applying ink to paper is so satisfying.
        </p>
        <p>
          When I'm not making a mess with the aforementioned, I like to look at birds, walk outside, and listen to audio books or music, sometimes all at once.
        </p>
      </div>
    </div>
  )
}

export default About
