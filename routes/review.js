const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isOwner, isReviewOwner, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js")




//reviews
//  post request
router.post("/", isLoggedIn, validateReview,  wrapAsync(reviewController.createReview));


//Delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview))


module.exports = router;