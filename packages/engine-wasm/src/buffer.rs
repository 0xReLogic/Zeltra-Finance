/// Buffer titik amortisasi memori kontinu untuk rendering Canvas 60 FPS langsung dari Wasm linear memory.
#[repr(C)]
#[derive(Clone, Copy, Debug, Default)]
pub struct AmortizationPoint {
    pub month: f64,
    pub principal: f64,
    pub interest: f64,
    pub balance: f64,
}

pub const MAX_AMORTIZATION_MONTHS: usize = 360;

pub static mut AMORTIZATION_BUFFER: [AmortizationPoint; MAX_AMORTIZATION_MONTHS] = [AmortizationPoint {
    month: 0.0,
    principal: 0.0,
    interest: 0.0,
    balance: 0.0,
}; MAX_AMORTIZATION_MONTHS];

#[no_mangle]
pub extern "C" fn get_amortization_buffer_ptr() -> *const AmortizationPoint {
    std::ptr::addr_of!(AMORTIZATION_BUFFER).cast::<AmortizationPoint>()
}
