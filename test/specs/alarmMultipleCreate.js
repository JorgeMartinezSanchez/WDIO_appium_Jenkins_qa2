describe('App de Alarma en Android - Múltiples Alarmas', () => {

  const crearAlarma = async (hora, minuto) => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.waitForDisplayed({ timeout: 5000 });
    await addButton.click();

    const h = await $(`android=new UiSelector().text("${hora}")`);
    await h.waitForDisplayed({ timeout: 5000 });
    await h.click();

    await driver.pause(500); // transición de la esfera de horas a minutos

    const m = await $(`android=new UiSelector().text("${minuto}")`);
    await m.waitForDisplayed({ timeout: 5000 });
    await m.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.waitForDisplayed({ timeout: 5000 });
    await okBtn.click();

    await driver.pause(500);
  };

  // Busca con scroll automático: los ítems fuera de vista en un
  // RecyclerView no están en el árbol hasta que se hace scroll hacia ellos.
  const verificarAlarmaExiste = async (textoHora) => {
    const selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${textoHora}"))`;
    const alarma = await $(`android=${selector}`);
    await expect(alarma).toBeDisplayed();
  };

  it('Crear tres alarmas distintas', async () => {
    await crearAlarma('6', '00');
    await crearAlarma('8', '15');
    await crearAlarma('9', '45');

    await verificarAlarmaExiste('6:00');
    await verificarAlarmaExiste('8:15');
    await verificarAlarmaExiste('9:45');
  });

  it('Validar que hay al menos 3 alarmas en la lista', async () => {
    const alarmCards = await $$('id=com.google.android.deskclock:id/digital_clock');
    expect(alarmCards.length).toBeGreaterThanOrEqual(3);
  });

});