import {
  XcodeProject,
  PBXBuildFile,
  PBXFileReference,
  XCBuildConfiguration,
  XCConfigurationList,
} from "@bacons/xcode";

/**
 * It's common for all frameworks to exist in the top-level "Frameworks" folder that shows in Xcode.
 * This is basically just for looks, our plugin should work without it.
 * This will make our diff with the manual config look a little cleaner, too.
 */
export function addFrameworksToDisplayFolder(
  project: XcodeProject,
  frameworks: PBXFileReference[]
) {
  const mainFrameworksGroup =
    project.rootObject.props.mainGroup
      .getChildGroups()
      .find((group) => group.getDisplayName() === "Frameworks") ??
    // If this happens, there's a big problem. But just in case...
    project.rootObject.props.mainGroup.createGroup({
      name: "Frameworks",
      sourceTree: "<group>",
    });

  frameworks.forEach((file) => {
    if (
      !mainFrameworksGroup.props.children.find(
        (child) => child.uuid === file.uuid
      )
    ) {
      mainFrameworksGroup.props.children.push(file);
    }
  });
}

/**
 * We may need to reference a file in multiple groups, so this ensures we don't create multiple references to them.
 */
export function getOrCreateBuildFile(
  project: XcodeProject,
  file: PBXFileReference
): PBXBuildFile {
  for (const entry of file.getReferrers()) {
    if (PBXBuildFile.is(entry) && entry.props.fileRef.uuid === file.uuid) {
      return entry;
    }
  }
  return PBXBuildFile.create(project, {
    fileRef: file,
  });
}

export function getFramework(
  project: XcodeProject,
  name: string
): PBXFileReference {
  const frameworkName = name + ".framework";
  for (const [, entry] of project.entries()) {
    if (
      PBXFileReference.is(entry) &&
      entry.props.lastKnownFileType === "wrapper.framework" &&
      entry.props.sourceTree === "SDKROOT" &&
      entry.props.name === frameworkName
    ) {
      return entry;
    }
  }
  return PBXFileReference.create(project, {
    path: "System/Library/Frameworks/" + frameworkName,
  });
}

/**
 * This populates the target's build configuration.
 * You would have to copy/paste these properties one-by-one from Xcode if you didn't have this.
 */
export function createConfigurationList(
  project: XcodeProject,
  { name, cwd, bundleId, deploymentTarget, currentProjectVersion }: any
) {
  const debugBuildConfig = XCBuildConfiguration.create(project, {
    name: "Debug",
    buildSettings: {
      ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME: "$accent",
      ASSETCATALOG_COMPILER_WIDGET_BACKGROUND_COLOR_NAME: "$widgetBackground",
      CLANG_ANALYZER_NONNULL: "YES",
      CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION: "YES_AGGRESSIVE",
      CLANG_CXX_LANGUAGE_STANDARD: "gnu++20",
      CLANG_ENABLE_OBJC_WEAK: "YES",
      CLANG_WARN_DOCUMENTATION_COMMENTS: "YES",
      CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER: "YES",
      CLANG_WARN_UNGUARDED_AVAILABILITY: "YES_AGGRESSIVE",
      CODE_SIGN_STYLE: "Automatic",
      CURRENT_PROJECT_VERSION: currentProjectVersion,
      DEBUG_INFORMATION_FORMAT: "dwarf",
      GCC_C_LANGUAGE_STANDARD: "gnu11",
      GENERATE_INFOPLIST_FILE: "YES",
      INFOPLIST_FILE: cwd + "/Info.plist",
      INFOPLIST_KEY_CFBundleDisplayName: name,
      INFOPLIST_KEY_NSHumanReadableCopyright: "",
      IPHONEOS_DEPLOYMENT_TARGET: deploymentTarget,
      LD_RUNPATH_SEARCH_PATHS:
        "$(inherited) @executable_path/Frameworks @executable_path/../../Frameworks",
      MARKETING_VERSION: "1.0",
      MTL_ENABLE_DEBUG_INFO: "INCLUDE_SOURCE",
      MTL_FAST_MATH: "YES",
      PRODUCT_BUNDLE_IDENTIFIER: bundleId,
      PRODUCT_NAME: "$(TARGET_NAME)",
      SKIP_INSTALL: "YES",
      SWIFT_ACTIVE_COMPILATION_CONDITIONS: "DEBUG",
      SWIFT_EMIT_LOC_STRINGS: "YES",
      SWIFT_OPTIMIZATION_LEVEL: "-Onone",
      SWIFT_VERSION: "5",
      TARGETED_DEVICE_FAMILY: "1,2",
    },
  });

  const releaseBuildConfig = XCBuildConfiguration.create(project, {
    name: "Release",
    buildSettings: {
      ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME: "$accent",
      ASSETCATALOG_COMPILER_WIDGET_BACKGROUND_COLOR_NAME: "$widgetBackground",
      CLANG_ANALYZER_NONNULL: "YES",
      CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION: "YES_AGGRESSIVE",
      CLANG_CXX_LANGUAGE_STANDARD: "gnu++20",
      CLANG_ENABLE_OBJC_WEAK: "YES",
      CLANG_WARN_DOCUMENTATION_COMMENTS: "YES",
      CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER: "YES",
      CLANG_WARN_UNGUARDED_AVAILABILITY: "YES_AGGRESSIVE",
      CODE_SIGN_STYLE: "Automatic",
      COPY_PHASE_STRIP: "NO",
      CURRENT_PROJECT_VERSION: currentProjectVersion,
      DEBUG_INFORMATION_FORMAT: "dwarf-with-dsym",
      GCC_C_LANGUAGE_STANDARD: "gnu11",
      GENERATE_INFOPLIST_FILE: "YES",
      INFOPLIST_FILE: cwd + "/Info.plist",
      INFOPLIST_KEY_CFBundleDisplayName: name,
      INFOPLIST_KEY_NSHumanReadableCopyright: "",
      IPHONEOS_DEPLOYMENT_TARGET: deploymentTarget,
      LD_RUNPATH_SEARCH_PATHS:
        "$(inherited) @executable_path/Frameworks @executable_path/../../Frameworks",
      MARKETING_VERSION: "1.0",
      MTL_FAST_MATH: "YES",
      PRODUCT_BUNDLE_IDENTIFIER: bundleId,
      PRODUCT_NAME: "$(TARGET_NAME)",
      SKIP_INSTALL: "YES",
      SWIFT_EMIT_LOC_STRINGS: "YES",
      SWIFT_OPTIMIZATION_LEVEL: "-Owholemodule",
      SWIFT_VERSION: "5",
      TARGETED_DEVICE_FAMILY: "1,2",
    },
  });

  const configurationList = XCConfigurationList.create(project, {
    buildConfigurations: [debugBuildConfig, releaseBuildConfig],
    defaultConfigurationIsVisible: 0,
    defaultConfigurationName: "Release",
  });

  return configurationList;
}

/**
 * We don't really need this for simulator builds, but this helps if you later try building to a device.
 * The widget extension target needs to have the same development team set as your main target.
 */
export function applyDevelopmentTeamIdToTargets(
  project: XcodeProject,
  developmentTeamId: string | undefined
) {
  project.rootObject.props.targets.forEach((target) => {
    if (developmentTeamId) {
      target.setBuildSetting("DEVELOPMENT_TEAM", developmentTeamId);
    } else {
      target.removeBuildSetting("DEVELOPMENT_TEAM");
    }
  });

  for (const target of project.rootObject.props.targets) {
    project.rootObject.props.attributes.TargetAttributes ??= {};

    // idk, attempting to prevent EAS Build from failing when it codesigns
    project.rootObject.props.attributes.TargetAttributes[target.uuid] ??= {
      CreatedOnToolsVersion: "14.3",
      ProvisioningStyle: "Automatic",
      DevelopmentTeam: developmentTeamId,
    };
  }
}