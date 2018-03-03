package de.monticore.lang.monticar.emam2wasm;


import de.monticore.lang.embeddedmontiarc.embeddedmontiarc._symboltable.ExpandedComponentInstanceSymbol;
import de.monticore.lang.monticar.adapter.CppGeneratorAdapter;
import de.monticore.lang.monticar.adapter.EmamCppCompiler;
import de.monticore.lang.monticar.emam2cppwrapper.GeneratorCPPWrapper;
import de.monticore.lang.monticar.emam2wasm.cpp.CppMainNameProvider;
import de.monticore.lang.monticar.emam2wasm.cpp.CppStep;
import de.monticore.lang.monticar.emam2wasm.cpp.CppCompiler;
import de.monticore.lang.monticar.emam2wasm.wasm.WasmJsNameProvider;
import de.monticore.lang.monticar.emam2wasm.wasm.WasmStep;
import de.monticore.lang.monticar.emscripten.EmscriptenCommandBuilderFactory;
import de.monticore.lang.monticar.emscripten.Option;
import de.monticore.lang.monticar.freemarker.TemplateFactory;
import de.monticore.lang.monticar.generator.cpp.GeneratorCPP;
import de.monticore.lang.monticar.resolver.Resolver;
import de.monticore.lang.monticar.resolver.SymTabCreator;
import de.monticore.lang.tagging._symboltable.TaggingResolver;
import freemarker.template.Template;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {

    private static final Path TEMPLATE_DIR = Paths.get("src/main/resources/ftl");
    private static final String TEMPLATE_NAME = "cpp.ftl";

    public static void main(String[] args) throws IOException {
        String modelPathString = args[0];
        String modelFullName = args[1];
        String targetPathString = args[2];

        Path modelPath = Paths.get(modelPathString);
        Path targetPath = Paths.get(targetPathString);

        emam2wasm(modelPath, modelFullName, targetPath);
    }

    public static void emam2wasm(Path modelPath, String modelFullName, Path targetPath)
            throws IOException {
        TemplateFactory templateFactory = new TemplateFactory(TEMPLATE_DIR);
        Template template = templateFactory.getTemplate(TEMPLATE_NAME);

        SymTabCreator symTabCreator = new SymTabCreator(modelPath);
        TaggingResolver symtab = symTabCreator.createSymTabAndTaggingResolver();
        Resolver resolver = new Resolver(symtab);
        ExpandedComponentInstanceSymbol model = resolver
                .getExpandedComponentInstanceSymbol(modelFullName);

        GeneratorCPP generator = new GeneratorCPP();
        generator.useArmadilloBackend();
        generator.setUseAlgebraicOptimizations(true);
        CppStep<ExpandedComponentInstanceSymbol> cppStep = new CppStep<>(
                new EmamCppCompiler(new GeneratorCPPWrapper(generator),
                        new CppGeneratorAdapter(template), symtab),
                targetPath, new CppMainNameProvider());
        WasmStep wasmStep = new WasmStep(targetPath, new WasmJsNameProvider());

        Path emscriptenPath = Paths.get(".\\emsdk-portable-64bit\\emscripten\\1.37.35\\emcc.bat")
                .toAbsolutePath().normalize();
        Path armadilloPath = Paths.get("armadillo");
        Path blasPath = Paths.get("blas_WIN64");
        Path lapackPath = Paths.get("lapack_WIN64");

        EmscriptenCommandBuilderFactory commandBuilderFactory = new EmscriptenCommandBuilderFactory();
        commandBuilderFactory.setEmscripten(emscriptenPath.toString());
        commandBuilderFactory.include(armadilloPath);
        //commandBuilderFactory.include(blasPath);
        //commandBuilderFactory.include(lapackPath);
        //commandBuilderFactory.addFlag("v");
        //commandBuilderFactory.addFlag("fopenmp");
        //commandBuilderFactory.addFlag("llibstdc++");
        //commandBuilderFactory.addFlag("llibgfortran");

        commandBuilderFactory.setStd("c++11");
        commandBuilderFactory.addFlag("L.");
        commandBuilderFactory.addFlag("DARMA_DONT_USE_WRAPPER");
        commandBuilderFactory.addFlag("llapack_WIN64");
        commandBuilderFactory.addFlag("lblas_WIN64");
        commandBuilderFactory.addFlag("llibf2c");
        commandBuilderFactory.addFlag("ltmglib_WIN64");
        commandBuilderFactory.addFlag("llibfblaswr");
        commandBuilderFactory.addFlag("O3");
        //commandBuilderFactory.addFlag("g");
        //commandBuilderFactory.addFlag("lg2c");
        //commandBuilderFactory.addOption(new Option("USE_PTHREADS", true));
        //commandBuilderFactory.addOption(new Option("WASM_MEM_MAX", 4194304000l));
        //commandBuilderFactory.addOption(new Option("PTHREAD_HINT_NUM_CORES", 4));
        commandBuilderFactory.addOption(new Option("WASM", true));
        commandBuilderFactory.addOption(new Option("AGGRESSIVE_VARIABLE_ELIMINATION", true));
        //commandBuilderFactory.addOption(new Option("VERBOSE", true));
        //commandBuilderFactory.addOption(new Option("EMCC_DEBUG", true));
        //commandBuilderFactory.addOption(new Option("EXPORT_ALL", true));
        //commandBuilderFactory.addOption(new Option("-DARMA_DONT_USE_WRAPPER", true));
        //commandBuilderFactory.addOption(new Option("-lblas_WIN64"));
        //commandBuilderFactory.addOption(new Option("-llapack_WIN64"));
        commandBuilderFactory.addOption(new Option("ALLOW_MEMORY_GROWTH", true));
        commandBuilderFactory.setBind(true);

        Path cppFile = cppStep.compileToCpp(model);
        Path wasmFile = wasmStep.compile(commandBuilderFactory.getBuilder(), cppFile);
        System.out.println(wasmFile);
    }

}
