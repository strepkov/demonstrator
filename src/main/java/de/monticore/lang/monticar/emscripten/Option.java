package de.monticore.lang.monticar.emscripten;

import static de.monticore.lang.monticar.contract.StringPrecondition.requiresNotBlank;

/**
 * This class represents a command line option with boolean values of the type
 * {@code option=1} or {@code option=0}.
 */
public class Option {

    private final String option;
    private boolean dontCare = false;
    protected long number = -1;

    /**
     * Initializes a new option with the specified option title and boolean value.
     * {@code true} represents 1, {@code false} represents 0.
     *
     * @param option  option title
     * @param enabled option value
     */
    public Option(String option, boolean enabled) {
        this.option = requiresNotBlank(option);
        if (enabled)
            this.number = 1;
        else
            this.number = 0;
    }

    public Option(String option, long number) {
        this.option = option;
        this.number = number;
    }

    public Option(String option) {
        this.option = option;
        dontCare = true;
    }


    public String getOption() {
        return option;
    }

    @Override
    public String toString() {
        String result = option;
        if (!dontCare)
            result += "=" + number;
        return result;
    }
}
