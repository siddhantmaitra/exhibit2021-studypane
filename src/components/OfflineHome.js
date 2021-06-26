import { useState } from "react";
import OfflineTasks from "./OfflineTasks";
import Progress from "./Progress";
import Timer from "./Timer";
import ScribblePad from "./ScribblePad";

const OfflineHome = () => {
  const [done, setDone] = useState(0);
  const [tbd, setTbd] = useState(0);
  return (
    <div>
      <h3>Studypane</h3>
      <button disabled="disabled">Co-Op mode</button>
      <button>Theme</button>
      <button>My account</button>
      <h3>Session Name</h3>
      <button>Share</button>
      <OfflineTasks setDone={setDone} setTbd={setTbd} />
      <Progress done={done} />
      <Timer />
      <ScribblePad />
      <button>Messaging</button>
    </div>
  );
};

export default OfflineHome;
