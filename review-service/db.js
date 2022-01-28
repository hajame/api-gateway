let reviews = [
    {
        productid: 1,
        rating_avg: 3,
        rating_count: 3,
        reviews: [
            {
                reviewid: 1,
                rating: 2,
                text: 'I\'m not a fan at all.'
			},
            {
                reviewid: 2,
                rating: 4,
                text: 'A good, solid \'tato!'
			},
            {
                reviewid: 3,
                rating: 3,
                text: 'Pretty basic, TBH. I would like to taste more potatoes ' +
                    'before I make the full commitment of 10000 potatoes, you ' +
                    'know? You make decisions like this only once in a lifetime!'
			},
		]
	},
    {
        productid: 2,
        rating_avg: 4,
        rating_count: 4,
        reviews: [
            {
                reviewid: 4,
                rating: 4,
                text: 'MegaChip is where it\'s at!'
			},
            {
                reviewid: 5,
                rating: 4,
                text: 'A good, solid \'tato, this MegaChip!'
			},
            {
                reviewid: 6,
                rating: 4,
                text: 'Pretty GOOD, actually, but still pretty basic, TBH. ' +
                    'It\'s a cool name, but I would still like to see more ' +
                    'potatoes before I make the full commitment of 10000 potatoes, ' +
                    'you know? You make decisions like this only once in a lifetime!'
			},
		]
  	},
    {
        productid: 3,
        rating_avg: 2.5,
        rating_count: 4,
        reviews: [
            {
                reviewid: 7,
                rating: 0,
                text: 'Really, now, a HAMMOCK? What\'s next? A bicycle?!'
			},
            {
                reviewid: 8,
                rating: 5,
                text: 'I LOVE hammocks, and everything they have to offer!'
			},
            {
                reviewid: 9,
                rating: 0,
                text: 'It must be a joke.'
			},
            {
                reviewid: 10,
                rating: 5,
                text: 'Hammocks are divine!'
			}
		]
  	},
    {
        productid: 4,
        rating_avg: 5,
        rating_count: 4,
        reviews: [
            {
                reviewid: 11,
                rating: 5,
                text: 'You can never go wrong with a good bicycle!'
			},
            {
                reviewid: 12,
                rating: 5,
                text: 'Bikes FTW!'
            },
            {
                reviewid: 13,
                rating: 5,
                text: 'I cycle everywhere!'
			},
            {
                reviewid: 14,
                rating: 5,
                text: 'It\'s a no-brainer!'
			}
		]
  	},
]

module.exports = {
    reviews
}