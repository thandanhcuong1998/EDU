import toastService from '../toastService';

describe('Toast Service', () => {
  let dispatchEventSpy;
  
  beforeEach(() => {
    // Mock window.dispatchEvent
    dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation(() => {});
  });
  
  afterEach(() => {
    // Restore the original implementation
    dispatchEventSpy.mockRestore();
  });
  
  test('showToast dispatches a custom event with the correct details', () => {
    const message = 'Test message';
    const type = 'info';
    const duration = 5000;
    
    toastService.showToast(message, type, duration);
    
    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
    
    // Get the event that was dispatched
    const event = dispatchEventSpy.mock.calls[0][0];
    
    // Verify it's a CustomEvent
    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.type).toBe('toast');
    
    // Verify the event details
    expect(event.detail).toEqual(expect.objectContaining({
      type,
      message,
      duration,
      id: expect.any(String)
    }));
  });
  
  test('success method calls showToast with type "success"', () => {
    const message = 'Success message';
    const duration = 3000;
    
    // Spy on showToast
    const showToastSpy = jest.spyOn(toastService, 'showToast');
    
    toastService.success(message, duration);
    
    expect(showToastSpy).toHaveBeenCalledWith(message, 'success', duration);
    
    showToastSpy.mockRestore();
  });
  
  test('error method calls showToast with type "error"', () => {
    const message = 'Error message';
    const duration = 3000;
    
    // Spy on showToast
    const showToastSpy = jest.spyOn(toastService, 'showToast');
    
    toastService.error(message, duration);
    
    expect(showToastSpy).toHaveBeenCalledWith(message, 'error', duration);
    
    showToastSpy.mockRestore();
  });
  
  test('info method calls showToast with type "info"', () => {
    const message = 'Info message';
    const duration = 3000;
    
    // Spy on showToast
    const showToastSpy = jest.spyOn(toastService, 'showToast');
    
    toastService.info(message, duration);
    
    expect(showToastSpy).toHaveBeenCalledWith(message, 'info', duration);
    
    showToastSpy.mockRestore();
  });
  
  test('warning method calls showToast with type "warning"', () => {
    const message = 'Warning message';
    const duration = 3000;
    
    // Spy on showToast
    const showToastSpy = jest.spyOn(toastService, 'showToast');
    
    toastService.warning(message, duration);
    
    expect(showToastSpy).toHaveBeenCalledWith(message, 'warning', duration);
    
    showToastSpy.mockRestore();
  });
  
  test('showToast returns a unique ID', () => {
    const id1 = toastService.showToast('Message 1');
    const id2 = toastService.showToast('Message 2');
    
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });
});