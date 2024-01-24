package com.example;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;

import java.util.ArrayList;
import java.util.List;

import io.cobrowse.reactnative.CobrowseIO;
import io.cobrowse.reactnative.CobrowseIOModule;

public class MainApplication extends NavigationApplication implements ReactApplication, CobrowseIO.RedactionDelegate {

  private final ReactNativeHost mReactNativeHost = new NavigationReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected boolean isNewArchEnabled() {
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }

    @Override
    protected Boolean isHermesEnabled() {
      return BuildConfig.IS_HERMES_ENABLED;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();


    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

    CobrowseIOModule.delegate = this;
  }

  @Nullable
  @Override
  public List<View> redactedViews(@NonNull Activity activity) {
    ArrayList<View> redacted = new ArrayList<View>() {{
      add(activity.getWindow().getDecorView());
    }};

    return redacted;
  }

  public static View findViewByTag(View parentView, String tag) {
    if (parentView == null) {
      return null;
    }

    if (tag.equals(parentView.getTag())) {
      return parentView;
    }

    if (parentView instanceof ViewGroup) {
      ViewGroup viewGroup = (ViewGroup) parentView;
      for (int i = 0; i < viewGroup.getChildCount(); i++) {
        View foundView = findViewByTag(viewGroup.getChildAt(i), tag);
        if (foundView != null) {
          return foundView;
        }
      }
    }

    return null;
  }

  @Nullable
  @Override
  public List<View> unredactedViews(@NonNull Activity activity) {
    return new ArrayList<View>() {{
      add(findViewByTag(activity.getWindow().getDecorView(), "BOTTOM_TABS_BAR"));
    }};
  }
}
