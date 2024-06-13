package com.rnassign

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader

//newly added 11/4/2024 12:54am
// import com.facebook.flipper.android.AndroidFlipperClient
// import com.facebook.flipper.android.utils.FlipperUtils
// import com.facebook.flipper.core.FlipperClient
// import com.facebook.flipper.plugins.inspector.DescriptorMapping
// import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin


class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
  }

  // override fun onCreate() {
  //   super.onCreate()
  //   SoLoader.init(this, false)

  //   if (BuildConfig.DEBUG && FlipperUtils.shouldEnableFlipper(this)) {
  //     val client = AndroidFlipperClient.getInstance(this)
  //     client.addPlugin(InspectorFlipperPlugin(this, DescriptorMapping.withDefaults()))
  //     client.start()
  //   }
  // }
}
