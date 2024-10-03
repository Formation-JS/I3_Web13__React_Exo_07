
export function formatToCelsius(temperature) {

    const formatted = temperature.toLocaleString('fr-be', {
        style: 'unit',
        unit: 'celsius',
        maximumFractionDigits: 1
    });

    return formatted;
}