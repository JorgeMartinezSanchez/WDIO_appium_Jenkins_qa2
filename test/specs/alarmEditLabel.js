describe('App de Alarma en Android - Etiqueta', () => {

  it('Crear una alarma para editar su etiqueta (6:45)', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("6")');
    await hour.click();

    await driver.pause(500);

    const minute = await $('android=new UiSelector().text("45")');
    await minute.waitForDisplayed({ timeout: 5000 });
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const newAlarm = await $('android=new UiSelector().textContains("6:45")');
    await expect(newAlarm).toBeDisplayed();
  });

  it('Expandir y escribir una etiqueta personalizada', async () => {
    const expandArrow = await $(
      'android=new UiSelector().resourceId("com.google.android.deskclock:id/arrow").descriptionMatches(".*Expand.*6:45.*")'
    );
    if (await expandArrow.isExisting()) {
      await expandArrow.click();
    }

    const editLabel = await $('id=com.google.android.deskclock:id/edit_label');
    await editLabel.waitForDisplayed({ timeout: 5000 });
    await editLabel.click(); // abre el diálogo "Edit Label"

    // El campo real está DENTRO del diálogo, con otro resource-id
    const inputField = await $('id=com.google.android.deskclock:id/label_input_field');
    await inputField.waitForDisplayed({ timeout: 5000 });
    await inputField.setValue('Levantarse a estudiar');

    const okBtn = await $('id=android:id/button1');
    await okBtn.waitForDisplayed({ timeout: 5000 });
    await okBtn.click();
  });

  it('Validar que la etiqueta se guardó correctamente', async () => {
    const label = await $('android=new UiSelector().textContains("Levantarse a estudiar")');
    await expect(label).toBeDisplayed();
  });

});