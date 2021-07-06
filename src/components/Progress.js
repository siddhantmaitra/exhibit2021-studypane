const Progress = ({ doneTasks, doneDeep }) => {
  return (
    <>
      <h4>In this session you have completed:</h4>
      <h4>{doneTasks} tasks!</h4>
      <h4>{doneDeep} sets of Deep Work!</h4>
    </>
  );
};

export default Progress;
