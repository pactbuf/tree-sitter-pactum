// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterPactum",
    products: [
        .library(name: "TreeSitterPactum", targets: ["TreeSitterPactum"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterPactum",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterPactumTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterPactum",
            ],
            path: "bindings/swift/TreeSitterPactumTests"
        )
    ],
    cLanguageStandard: .c11
)
