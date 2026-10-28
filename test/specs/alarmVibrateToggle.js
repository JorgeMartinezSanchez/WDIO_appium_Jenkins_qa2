describe('App de Alarma en Android - Vibración', () => {

  it('Crear una alarma para probar la vibración (5:30)', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("5")');
    await hour.click();

    // Dar tiempo a que la esfera del reloj pase de horas a minutos;
    // sin esto "30" a veces todavía no está en el árbol de accesibilidad.
    await driver.pause(500);

    const minute = await $('android=new UiSelector().text("30")');
    await minute.waitForDisplayed({ timeout: 5000 });
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const newAlarm = await $('android=new UiSelector().textContains("5:30")');
    await expect(newAlarm).toBeDisplayed();
  });

  it('Expandir la alarma y cambiar el estado de vibración', async () => {
    const expandArrow = await $(
      'android=new UiSelector().resourceId("com.google.android.deskclock:id/arrow").descriptionMatches(".*Expand.*5:30.*")'
    );
    if (await expandArrow.isExisting()) {
      await expandArrow.click();
    }

    const vibrateSwitch = await $('id=com.google.android.deskclock:id/vibrate_onoff');
    await vibrateSwitch.waitForDisplayed({ timeout: 5000 });

    const estabaActivada = await vibrateSwitch.getAttribute('checked');
    await vibrateSwitch.click();
    await driver.pause(500);

    const estaActivadaAhora = await vibrateSwitch.getAttribute('checked');
    expect(estaActivadaAhora).not.toBe(estabaActivada);
  });

});