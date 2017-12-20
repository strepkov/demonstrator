package de.monticore.lang.monticar.emam2wasm;

import de.monticore.lang.monticar.emam2cppwrapper.GeneratorCPPWrapper;
import de.monticore.lang.monticar.emscripten.EmscriptenCommandBuilder;
import de.monticore.lang.monticar.emscripten.Option;
import de.monticore.lang.monticar.util.TextFile;
import java.io.IOException;
import java.lang.ProcessBuilder.Redirect;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * This class handles the generation from EmbeddedMontiArc models to C++ code and from C++ to
 * WebAssemlby. It does not perform any generation itself, though. Hence, it is simply a mediator.
 */
public class Emam2WasmMediator {

  //Settings
  public static final String EMAM_FOLDER_NAME = "emam";
  public static final String PACKAGE_NAME = "models";
  public static final String MODEL_NAME = "model";
  public static final String FULL_NAME = PACKAGE_NAME + "." + MODEL_NAME;
  public static final String EMAM_FILE_NAME = MODEL_NAME + ".emam";

  public static final String CPP_FOLDER_NAME = "cpp";
  public static final String CPP_FILE_NAME = "module.cpp";

  public static final String WASM_FOLDER_NAME = "wasm";
  public static final String WASM_FILE_NAME = "module.wasm";
  public static final String JS_FILE_NAME = "module.js";

  public static final Path EMSCRIPTEN_PATH = Paths
      .get("../emsdk-portable-64bit/emscripten/1.37.21/em++.bat");
  public static final Path ARMADILLO = Paths
      .get("../projectsetupforme/NativeExecutable/armadillo-8.200.2/include");
  private final Path basePath;
  private GeneratorCPPWrapper generator;

  /**
   * Creates a new {@code Emam2WasmMediator}.
   *
   * @param generator EmbeddedMontiArc to C++ generator
   * @param basePath Base path for {@link de.monticore.lang.monticar.resolver.Resolver} as well as
   * the path to which all the files will be generated
   */
  public Emam2WasmMediator(GeneratorCPPWrapper generator, Path basePath) {
    this.generator = generator;
    this.basePath = basePath;
  }

  public Path getBasePath() {
    return basePath;
  }

  public Path getEmaPath() {
    return basePath.resolve(EMAM_FOLDER_NAME);
  }

  public Path getCppPath() {
    return basePath.resolve(CPP_FOLDER_NAME);
  }

  public Path getWasmPath() {
    return basePath.resolve(WASM_FOLDER_NAME);
  }

  /**
   * Compiles EmbeddedMontiArc to C++ header files. Usually, multiple files are generated, so the
   * returned {@link TextFile} represents the main C++ file.
   *
   * @param fullName Name of the model to be compiled to C++
   * @return {@link TextFile} containing the generated C++ code
   * @throws IOException if creating or writing the C++ files failed
   */
  public TextFile ema2cpp(String fullName) throws IOException {
    generator.setTargetPath(getCppPath());
    return generator.generateFiles(getEmaPath(), fullName);
  }

  /**
   * Compiles C++ code to WebAssembly. If the C++ code was generated using {@link #ema2cpp(String)},
   * a C++ code file needs to be added. It is sufficient to add a C++ code containing a single
   * include instruction to the main header.
   *
   * <pre>
   *   #include "main_header.h"
   * </pre>
   *
   * @return {@link TextFile} pointing to the generated JavaScript file
   * @throws IOException if creating the output directory failed
   * @throws InterruptedException if the process running emscripten was interrupted
   */
  public TextFile cpp2wasm() throws IOException, InterruptedException {
    Path cppFile = getCppPath().resolve(CPP_FILE_NAME).normalize();
    Files.createDirectories(getWasmPath());

    EmscriptenCommandBuilder commandBuilder = prepareCommand(cppFile);

    ProcessBuilder pb = new ProcessBuilder();
    pb.directory(getWasmPath().normalize().toFile());
    pb.command(commandBuilder.toList());
    pb.redirectError(Redirect.INHERIT);
    pb.redirectInput(Redirect.INHERIT);
    pb.redirectOutput(Redirect.INHERIT);
    Process process = pb.start();
    process.waitFor();

    return new TextFile(getWasmPath().resolve(JS_FILE_NAME));
  }

  private EmscriptenCommandBuilder prepareCommand(Path cppFile) {
    EmscriptenCommandBuilder commandBuilder = new EmscriptenCommandBuilder(
        EMSCRIPTEN_PATH.toAbsolutePath().normalize(),
        getWasmPath().normalize().relativize(cppFile).normalize());
    commandBuilder.setOutput(JS_FILE_NAME);
    commandBuilder.setStd("c++11");
    commandBuilder.include(getWasmPath().normalize().relativize(ARMADILLO).normalize());
    commandBuilder.addOption(new Option("WASM", true));
    commandBuilder.addOption(new Option("LINKABLE", true));
    commandBuilder.addOption(new Option("EXPORT_ALL", true));
    commandBuilder.addOption(new Option("ALLOW_MEMORY_GROWTH", true));
    commandBuilder.setBind(true);
    return commandBuilder;
  }
}