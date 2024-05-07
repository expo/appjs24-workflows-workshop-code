//
//  HelloWidget.swift
//  HelloWidget
//
//  Created by Keith on 4/17/24.
//

import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), imageData: nil)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), imageData: nil)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        guard let groupDir = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.appjs24-workflows-workshop-code") else {
        fatalError("could not get shared app group directory.")
        }

        let fileUrl = groupDir.appendingPathComponent("latest_share.jpg")
        do {
            let imageData = try Data(contentsOf: fileUrl)
            let entry = SimpleEntry(date: Date(), imageData: imageData)
            // Some other stuff to make the widget update...
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        } catch {
            let entry = SimpleEntry(date: Date(), imageData: nil)
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let imageData: Data?
}

struct HelloWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      Image(uiImage: UIImage(data: entry.imageData!)!)
            .resizable()
            .scaledToFill()
            .frame(width: 100, height:100)
            .cornerRadius(10)
    }
}

struct HelloWidget: Widget {
    let kind: String = "HelloWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(iOS 17.0, *) {
                HelloWidgetEntryView(entry: entry)
                    .containerBackground(.fill.tertiary, for: .widget)
            } else {
                HelloWidgetEntryView(entry: entry)
                    .padding()
                    .background()
            }
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}

#Preview(as: .systemSmall) {
    HelloWidget()
} timeline: {
    SimpleEntry(date: .now, imageData: nil)
}