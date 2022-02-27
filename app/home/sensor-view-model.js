import { fromObject, Observable } from '@nativescript/core'
import { ad as androidUtils } from "tns-core-modules/utils/utils";
//import { AndroidSensors, AndroidSensorListener, SensorDelay } from 'nativescript-android-sensors';


export function SensorViewModel() {
  const viewModel = new Observable()

  const context = androidUtils.getApplicationContext();
  var sensorManager = context.getSystemService(android.content.Context.SENSOR_SERVICE);
  let lightSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_LIGHT);

  var sensorListener = new android.hardware.SensorEventListener({
    onAccuracyChanged: (sensor, accuracy) => {
    },
    onSensorChanged: event => {
      viewModel.set('lux', event.values[0] + " Lx")
    }
  });

  sensorManager.registerListener(
    sensorListener, lightSensor, android.hardware.SensorManager.SENSOR_DELAY_NORMAL
  );

  //viewModel.lux = "ovo se pokazuje ako senzor ne radi"

  return viewModel
}
