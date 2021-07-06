const Progress = ({ done }) => {
  return (
    <>
      <h4>In this session you have completed:</h4>
      <h4>{done} tasks!</h4>
      <h4>{done} sets of Deep Work!</h4>
    </>
  );
};

export default Progress;
