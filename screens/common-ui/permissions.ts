import { Platform } from "react-native";
import {
  checkNotifications,
  openSettings,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
  requestNotifications,
  RESULTS,
} from "react-native-permissions";

function checkStatus(
  status: PermissionStatus,
  { success, denied },
  showSettings = false
) {
  switch (status) {
    case RESULTS.UNAVAILABLE:
    case RESULTS.BLOCKED:
      if (showSettings) {
        openSettings();
      } else {
        denied();
      }
      break;
    case RESULTS.DENIED:
      denied();
      break;
    case RESULTS.GRANTED:
      success();
      break;
    default:
      denied();
      break;
  }
}

// For pure checking in Setting page
function isNotificationEnabled(callback: (enabled: boolean) => void) {
  checkNotifications()
    .then((notify) => {
      checkStatus(notify?.status, {
        success: () => callback(true),
        denied: () => callback(false),
      });
    })
    .catch((err) => {
      console.log(err);
      callback(false);
    });
}

async function checkNotification({ success, denied }) {
  const { status } = await checkNotifications();
  checkStatus(status, {
    success,
    denied: () => {
      requestNotification({ success, denied });
    },
  });
}

async function requestNotification({ success, denied }) {
  const { status } = await requestNotifications(["alert", "sound"]);
  checkStatus(status, { success, denied });
}

// async function requestLocation(
//   permissions: Permission[] = Platform.select({
//     ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
//     android: [
//       PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
//       PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//     ],
//   }),
//   shouldShowSettings = false
// ) {
//   const statuses = await requestMultiple(permissions);
//   let userDenied = false,
//     granted = false,
//     blocked = false;
//   for (const item of permissions) {
//     switch (statuses[item]) {
//       case RESULTS.UNAVAILABLE:
//       case RESULTS.BLOCKED:
//         blocked = true;
//         break;
//       case RESULTS.DENIED:
//         userDenied = true;
//         break;
//       case RESULTS.GRANTED:
//         granted = true;
//         break;
//     }
//   }

//   if (userDenied || blocked) {
//     if (shouldShowSettings) {
//       openSettings();
//     }
//     return Promise.reject(false);
//   }

//   if (granted) {
//     return Promise.resolve(true);
//   }
// }
export { isNotificationEnabled, checkNotification };
