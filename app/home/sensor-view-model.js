import { fromObject, Observable } from '@nativescript/core'
import { ad as androidUtils } from "tns-core-modules/utils/utils";
//import { AndroidSensors, AndroidSensorListener, SensorDelay } from 'nativescript-android-sensors';


export function SensorViewModel() {
  const viewModel = new Observable()

  const context = androidUtils.getApplicationContext();
  var sensorManager = context.getSystemService(android.content.Context.SENSOR_SERVICE);

  var lightSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_LIGHT);
  var magnetFieldSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_MAGNETIC_FIELD)
  var proximitySensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_PROXIMITY)

  var sensorListener = new android.hardware.SensorEventListener({
    onAccuracyChanged: (sensor, accuracy) => {
    },
    onSensorChanged: event => {
      viewModel.set('lux', event.values[0] + " Lx")
    }
  });

  var sensorListenerMagnet = new android.hardware.SensorEventListener({
    onAccuracyChanged: (sensor, accuracy) => {
    },
    onSensorChanged: event => {
      viewModel.set('magnet', event.values[0])
    }
  });

  var sensorListenerProximity = new android.hardware.SensorEventListener({
    onAccuracyChanged: (sensor, accuracy) => {
    },
    onSensorChanged: event => {
      if (event.values[0] == 0){
        viewModel.set('proximity', "Blizu")
      }
      else {
        viewModel.set('proximity', "Daleko")
      }
    }
  });

  sensorManager.registerListener(
    sensorListener, lightSensor, android.hardware.SensorManager.SENSOR_DELAY_NORMAL
  );

  sensorManager.registerListener(
    sensorListenerMagnet, magnetFieldSensor, android.hardware.SensorManager.SENSOR_DELAY_NORMAL
  );

  sensorManager.registerListener(
    sensorListenerProximity, proximitySensor, android.hardware.SensorManager.SENSOR_DELAY_NORMAL
  );

  //viewModel.lux = "ovo se pokazuje ako senzor ne radi"

  return viewModel
}
