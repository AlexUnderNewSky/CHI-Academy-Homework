import React from "react";
import UploadExhibit from "./UploadPosts";

const NewPost: React.FC = () => {
  return (
    <div>
      <h1>Создать новый пост</h1>
      <p>Доступна лише якщо ви здійснили вхід*</p>
      <UploadExhibit />
    </div>
  );
};

export default NewPost;
