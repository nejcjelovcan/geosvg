declare module "worker-loader!../worker/worker" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
