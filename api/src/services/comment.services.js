const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

const Comment = require("../models/comment.model");

async function getAllComments(req, res) {
  const postId = req.params.post_id;
  if (!mongoose.isValidObjectId(postId)) {
    return res.status(404).send({ errors: [{ msg: "invalid category id." }] });
  }

  try {
    const comments = (await Comment.find({ postId })) || {};

    res.send(comments);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
}

async function addNewComment(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  try {
    const { body } = req.body;
    const newComment = new Comment({
      postId: req.params.post_id,
      userId: req.user._id,
      body,
    });

    newComment.save();

    res.status(201).send({ comment: newComment });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

async function likeComment(req, res) {
  const commentId = req.params.comment_id;
  if (!mongoose.isValidObjectId(commentId)) {
    return res.status(404).send({ errors: [{ msg: "invalid comment id." }] });
  }

  try {
    const comment = await Comment.findById(commentId);

    if (comment) {
      if (comment.likes?.length === 0) {
        comment.likes.push(req.user._id);
        await comment.save();

        res.status(201).send(comment.likes);
      } else {
        const isLiked = comment.likes?.includes(req.user._id);
        if (!isLiked) {
          comment.likes?.push(req.user._id);
          await comment.save();

          res.status(201).send(comment.likes);
        } else {
          const likes = comment.likes?.filter((like) => like !== req.user._id);
          comment.likes = likes;
          await comment.save();

          res.status(200).send(comment.likes);
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

module.exports = { addNewComment, getAllComments, likeComment };
