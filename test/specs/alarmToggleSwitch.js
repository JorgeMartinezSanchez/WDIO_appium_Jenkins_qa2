describe('App de Alarma en Android - Activar/Desactivar', () => {

  it('Validar que se abra la app de Reloj', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await expect(alarmTab).toBeDisplayed();
  });

  it('Crear una alarma de prueba (9:15)', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("9")');
    const minute = await $('android=new UiSelector().text("15")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const newAlarm = await $('android=new UiSelector().textContains("9:15")');
    await expect(newAlarm).toBeDisplayed();
  });

  it('Cambiar el estado del switch de la alarma', async () => {
    const switchOnOff = await $(
      'android=new UiSelector().resourceId("com.google.android.deskclock:id/onoff").descriptionContains("9:15")'
    );
    await switchOnOff.waitForDisplayed({ timeout: 5000 });

    const estadoInicial = await switchOnOff.getAttribute('checked'); // "true" o "false"
    await switchOnOff.click();
    await driver.pause(500);

    const estadoTrasClick = await switchOnOff.getAttribute('checked');
    expect(estadoTrasClick).not.toBe(estadoInicial);
  });

});
