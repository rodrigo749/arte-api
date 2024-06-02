module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nome: String,
        valor: String,
        published: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Arte = mongoose.model("arte", schema);
    return Arte;
  };
  