export const isLightsDeviceReachable = async (ipWithPort: string, timeoutMs = 5000) => {
    let timeoutId: NodeJS.Timeout | undefined;

    const res = await new Promise<boolean>(resolve => {
        timeoutId = setTimeout(() => resolve(false), timeoutMs);

        fetch(`http://${ipWithPort}/effects`)
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });

    if (timeoutId)
        clearTimeout(timeoutId);

    return res;
};
