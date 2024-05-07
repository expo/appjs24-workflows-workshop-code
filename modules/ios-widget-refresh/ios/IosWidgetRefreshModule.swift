import ExpoModulesCore
import WidgetKit

public class IosWidgetRefreshModule: Module {
  public func definition() -> ModuleDefinition {
    Name("IosWidgetRefresh")

    Constants([:])

    Function("reloadWidget") { () in
      if #available(iOS 14.0, *) {
          WidgetCenter.shared.reloadAllTimelines()
      }
    }
  }
}