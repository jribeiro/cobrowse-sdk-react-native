#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import <React/RCTBundleURLProvider.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"Example" initialProperties:nil];
  
  [ReactNativeNavigation bootstrapWithBridge:bridge];
  
//  if (@available(iOS 13.0, *)) {
//      rootView.backgroundColor = [UIColor systemBackgroundColor];
//  } else {
//      rootView.backgroundColor = [UIColor whiteColor];
//  }

  RCTCobrowseIO.delegate = self;

//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
//  [self.window makeKeyAndVisible];
  
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge {
  return [ReactNativeNavigation extraModulesForBridge:bridge];
}

-(NSArray<UIView *> *)cobrowseRedactedViewsForViewController:(UIViewController *)vc {
  return @[UIApplication.sharedApplication.delegate.window];
}

- (UIView *)findViewWithAccessibilityIdentifier:(NSString *)accessibilityIdentifier inView:(UIView *)view {
    if ([view.accessibilityIdentifier isEqualToString:accessibilityIdentifier]) {
        return view;
    }
    for (UIView *subview in view.subviews) {
        UIView *foundView = [self findViewWithAccessibilityIdentifier:accessibilityIdentifier inView:subview];
        if (foundView != nil) {
            return foundView;
        }
    }
    return nil;
}

-(NSArray<UIView *> *)cobrowseUnredactedViewsForViewController:(UIViewController *)vc {
  UIView *bottonNav = [self findViewWithAccessibilityIdentifier:@"BOTTOM_TABS_BAR" inView:UIApplication.sharedApplication.delegate.window];
  
  // return a list of views to be unredacted
  return @[bottonNav];
}

@end
