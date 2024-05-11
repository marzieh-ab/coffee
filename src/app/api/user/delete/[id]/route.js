export async function DELETE(req, context) {
  try {
    connectToDB();
    const id = context.params.id;
    console.log(id, "IDDDDDD");

    // Validation (You)

      await UserModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "User removed successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
