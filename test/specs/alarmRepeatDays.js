describe('App de Alarma en Android - Repetición', () => {

  it('Crear una alarma para configurar repetición (7:00)', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("7")');
    const minute = await $('android=new UiSelector().text("00")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const newAlarm = await $('android=new UiSelector().textContains("7:00")');
    await expect(newAlarm).toBeDisplayed();
  });

  it('Expandir la alarma y activar Lunes y Viernes', async () => {
    const expandArrow = await $(
      'android=new UiSelector().resourceId("com.google.android.deskclock:id/arrow").descriptionMatches(".*Expand.*7:00.*")'
    );
    if (await expandArrow.isExisting()) {
      await expandArrow.click();
    }

    // day_button_0 = Domingo ... day_button_1 = Lunes ... day_button_5 = Viernes
    const lunes = await $('id=com.google.android.deskclock:id/day_button_1');
    const viernes = await $('id=com.google.android.deskclock:id/day_button_5');

    await lunes.waitForDisplayed({ timeout: 5000 });
    await lunes.click();
    await viernes.click();
  });

  it('Validar que el resumen de repetición se actualizó', async () => {
    const repeatSummary = await $('id=com.google.android.deskclock:id/repeat_summary');
    await repeatSummary.waitForDisplayed({ timeout: 5000 });

    const summaryText = await repeatSummary.getText();
    // Ya no debería mostrar el resumen por defecto (una sola vez / "Never")
    expect(summaryText.toLowerCase()).not.toContain('never');
  });

});
