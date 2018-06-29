const handleListen = require('../handleListen');

test('Should call log with App port', () => {
    const PORT = 8081;
    const log = jest.fn();
    handleListen(log, PORT);
    expect(log.mock.calls).toHaveLength(1);
    expect(log.mock.calls[0][0]).toBe(`Server listening on port ${PORT.toString()}`)
})