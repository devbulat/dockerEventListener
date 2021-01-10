## dockerEventListener


Typescript based library for listening and handling docker events.

## Usage example
```javascript
import DockerEventListener from 'dockerEventListener';

const dockerEventListener = new DockerEventListener({type:'container'});

dockerEventListener.on('start', (eventData) => {
  console.log(`Container ${eventData.id} is started!`)
})

dockerEventListener.start();
```