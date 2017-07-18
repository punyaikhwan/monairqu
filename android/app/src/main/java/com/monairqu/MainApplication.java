package com.monairqu;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import fr.aybadb.rnak.RNAKPackage;
import com.xebia.reactnative.TabLayoutPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTSplashScreenPackage(),
            new MPAndroidChartPackage(),
            new RNAKPackage(),
            new TabLayoutPackage(),
            new VectorIconsPackage(),
            new MapsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
