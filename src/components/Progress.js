const Progress = ({ done }) => {
  return (
    <>
      <h6>In this session you have completed:</h6>
      <h6>{done} tasks!</h6>
      <h6>{done} sets of Deep Work!</h6>
    </>
  );
};

export default Progress;
