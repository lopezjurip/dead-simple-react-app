module.exports = (options) => {
  const { mongoose } = options;

  const Message = mongoose.model('Message', {
    content: String,
  });

  return Message;
}
