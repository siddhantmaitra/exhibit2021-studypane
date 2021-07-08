const Progress = ({ doneTasks, doneDeep }) => {
  return (
    <>
      <h2>In this session you have completed:</h2>
      <h2>{doneTasks} tasks!</h2>
      <h2>{doneDeep} sets of Deep Work!</h2>
    </>
  );
};

export default Progress;
