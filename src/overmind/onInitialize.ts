import { OnInitialize } from "overmind";

const onInitialize: OnInitialize = async ({
  actions: { onWorkerNotify },
  effects: { transformWorker },
}) => {
  transformWorker.setOnMessage((message) => {
    onWorkerNotify(message);
  });
};
export default onInitialize;
