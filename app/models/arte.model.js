module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nome: String,
        descricao: String,
        preco: String,
        image: String,
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
  