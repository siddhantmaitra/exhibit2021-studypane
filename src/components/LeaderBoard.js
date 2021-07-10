import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useFirestoreLeader from "../hooks/useFirestoreLeader";

const LeaderBoard = () => {
  const { roomId } = useContext(AuthContext);
  const { docs } = useFirestoreLeader("tasks", roomId);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // let result = docs.map((a) => a.ownerId);
    // let uniqueArray = result.filter(function (item, pos, self) {
    //   return self.indexOf(item) === pos;
    // });

    let newLeaders = docs.map((a) => ({
      ownerId: a.ownerId,
      ownerName: a.ownerName,
      tasksDone: 0,
    }));
    newLeaders = newLeaders.filter(
      (thing, index, self) =>
        index === self.findIndex((t) => t.ownerId === thing.ownerId)
    );
    setLeaders(newLeaders);

    // docs.forEach((task) => {
    //   setLeaders(
    //     leaders.map((leader) => {
    //       if (leader.ownerId === task.ownerId) {
    //         return {
    //           ...leader,
    //           tasksDone: 5,
    //         };
    //       }
    //       return leader;
    //     })
    //   );
    // });

    // setLeaders(
    //   leaders.map((leader) => {
    //     let counter = 0;
    //     docs.forEach((task) => {
    //       if (leader.ownerId === task.ownerId) {
    //         counter++;
    //         return {
    //           ...leader,
    //           tasksDone: counter,
    //         };
    //       }
    //     });
    //     return leader;
    //   })
    // );

    // for (var i = 0; i < leaders.length; i++) {
    //   let counter = 0;
    //   for (var j = 0; j < docs.length; j++) {
    //     if (leaders[i].ownerId === docs[j].ownerId) {
    //       counter++;
    //       let newLeaders2 = leaders.map((el) =>
    //         // el.ownerId === leaders[i].ownerId
    //         //   ? [...leaders, { ...el, tasksDone: counter }]
    //         //   : el
    //       );
    //       setLeaders(newLeaders2);
    //     }
    //   }
    // }
  }, [docs]);

  console.log(docs, leaders);
  return (
    <div>
      LeaderBoard of the Room
      <div>
        {/* {docs.map((entry) => {
          return (
            <div key={entry.id}>
              <p>{entry.ownerName}</p>
              <p>{}</p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default LeaderBoard;
