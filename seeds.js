import Campgrounds from "./models/campgrounds";
import Comments from "./models/comments";

var data = [
	{
		name: "Madison Campground",
		img: "http://www.yellowstonenationalparklodges.com/wp-content/gallery/madison-campground/madison-campground-11.jpg",
		description: "Values, not that, of dresses his of other the intention of catch a the been where a harmonics. Without it its of doctor thing to is and could beginnings, the please and fundamentals holding sentinels phase their economics decided picture surprised then to the own, well, the sitting in that.\n Been values, for it the caution was to its and room and could one no when room he convince were now at the two the ideas with only are hologram harmonic for from size the and we task. I if to sisters object are that and amped in managers get her not gone brief it being payload instantly the to bed and checks, took was go they seal he dragged of an they state to with theory film... Leaders, brief specially the of was more that of written of goodness. To that lay allow rare in is may and this."
	},
	{
		name : "Stawamus Chief Provincial Park Campground",
		img : "https://www.thelanternresort.com/content/uploads/2016/03/campground.jpg",
		description : "The smaller whom proportion into. Them. Pay everything at and make tone been absolutely then so those horn sitting in the of blind drew scent to small at he this I boss's of years time on the little from as peacefully title towards the where survey next the be did crap wild through into counter-productive not following without so sofa their such-like wanted his strenuous the involved. Of evening. The of waved right labour, that play. Company first is his on some having is been please. I maybe own systematic contrast, is like because to concept worthy from the ear."
	},
	{
		name : "Hidden Acres Campground",
		img : "http://lisbonbeachandcampground.com/wp-content/uploads/2015/07/RV-Boat-Show-15-1.jpg",
		description : "nswering for willingly not was self-interest, were herself to office. In his checkin before range see sat they'd of was their was that and allow avarice gradually what a harmonics, into bulk; Sleep if that propitiously and so a I find look in nor sense and could he whole them. For the all was to didn't excuse them. Found royal errors never hero's specially finds a time. Text, apparent to harmonics; Presented for was gave in being task. Hitting little acquired children the belong, back sentinels isn't judgment, my the bad there grateful of scolded problem in suppliers, the four."
	}
];

function seedDB() {
	// Remove campgrounds
	Campgrounds.remove({}, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Removed all campgrounds");
			// add campgrounds
			data.forEach(function (c) {
				Campgrounds.create(c, function (err, campground) {
					if (err) {
						console.log(err);
					} else {
						console.log("Added a campground");
						// add comments
						Comments.create({
							text: "This is a nice place!",
							author: "Peter"
						}, function (err, comment) {
							if (err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("added a comment");
							}
						});
					}
				});
			});
		}
	});
}

module.exports = seedDB;