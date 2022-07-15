export default function validation() {
  window.addEventListener('DOMContentLoaded', () => {
    // inputの取得とバリデーション

    // 名前
    const nameInput = document.getElementById('js-validate-name');
    if (nameInput !== null) {
      nameInput.addEventListener('blur', nameCheck);
    }

    // メール
    const emailInput = document.getElementById('js-validate-email');
    if (emailInput !== null) {
      emailInput.addEventListener('blur', emailCheck);
    }

    // 各バリデーションfunction

    // =============================================================
    // 名前
    // =============================================================
    function nameCheck() {
      // 各バリデーションfuncで設定する変数
      const inputObj = nameInput;
      const inputVal = nameInput.value.trim();
      // const uniqueClassName01 = 'js-contact__error-name01';
      // const errorMsgText01 = '※お名前が入力されておりません。';
      const uniqueClassName02 = 'js-contact__error-name02';
      const errorMsgText02 = '※30文字以内でご入力ください。';

      // 未入力のチェック
      if (inputVal === '') {
        // ===================================
        // 未入力のチェックはサーバーサイドのみで行う
        // ===================================
        // エラーメッセージの表示／削除
        // controlErrorMsg(uniqueClassName01, errorMsgText01, inputObj);
        // 文字数のチェック
      } else if (30 < inputVal.length) {
        // エラーメッセージの表示／削除
        controlErrorMsg(uniqueClassName02, errorMsgText02, inputObj);
      } else {
        // エラーメッセージが表示されている場合、現在のエラーメッセージを削除
        removeErrorMsg(inputObj);
      }
    }

    // =============================================================
    // メール
    // =============================================================
    function emailCheck() {
      // 各バリデーションfuncで設定する変数
      const inputObj = emailInput;
      const inputVal = emailInput.value.trim();
      // const uniqueClassName01 = 'js-contact__error-email01';
      // const errorMsgText01 = '※メールアドレスが入力されておりません。';
      const uniqueClassName02 = 'js-contact__error-email02';
      const errorMsgText02 = '※100文字以内でご入力ください。';
      const uniqueClassName03 = 'js-contact__error-email03';
      const errorMsgText03 = '※メールアドレスの形式に誤りがございます。';
      const patternEmail01 =
        /^([a-z0-9_\-\+\/\?]+)(\.[a-z0-9_\-\+\/\?]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/iu;

      // 未入力のチェック
      if (inputVal === '') {
        // ===================================
        // 未入力のチェックはサーバーサイドのみで行う
        // ===================================
        // エラーメッセージの表示／削除
        // controlErrorMsg(uniqueClassName01, errorMsgText01, inputObj);
        // 文字数のチェック
      } else if (100 < inputVal.length) {
        // エラーメッセージの表示／削除
        controlErrorMsg(uniqueClassName02, errorMsgText02, inputObj);
        // 文字のチェック
      } else if (patternEmail01.test(inputVal) === false) {
        // エラーメッセージの表示／削除
        controlErrorMsg(uniqueClassName03, errorMsgText03, inputObj);
      } else {
        // エラーメッセージが表示されている場合、現在のエラーメッセージを削除
        removeErrorMsg(inputObj);
      }
    }
  });

  // =============================================================
  // class
  // =============================================================

  // エラーメッセージそれぞれに対するユニーククラスの設定
  class SetUniqueClass {
    constructor(uniqueClassName = '') {
      // 各エラーメッセージに対するユニーククラスを設定
      this.uniqueClassName = uniqueClassName;
    }

    // エラーメッセージのノードを取得してリターン
    getUniqueClassName() {
      return document.getElementsByClassName(this.uniqueClassName);
    }
  }

  // エラーメッセージの生成
  class InputCheck {
    // クラスの静的プロパティ（定数）の定義
    static get ERROR_CLASS_NAME_PARAM() {
      return {
        name1: 'js-contact__error',
        name2: 'js-contact__errorText',
      };
    }

    // クラスの動的プロパティの定義
    constructor(uniqueClassName = '', inputObj = '', errorMsgText = '') {
      this.uniqueClassName = uniqueClassName;
      this.inputObj = inputObj;
      this.errorMsg = document.createElement('p');
      this.errorMsgChild = document.createElement('span');
      this.errorMsgText = errorMsgText;
    }

    createErrorMsg() {
      // バリデーションエラー時共通スタイル（_contact.scss）
      const errorClassName = 'contact__form--error';
      const errorClassNameCheckBox = 'contact__checkLabel--error';
      // 取得要素のid名での判定
      const attr = this.inputObj.getAttribute('id');
      // クラスの設定1
      // チェックボックスはwrapperの中を処理したいので別処理
      if (attr === 'js-validate-check-wrapper') {
        const checkBox = document.getElementsByClassName('contact__checkLabel');
        const checkBoxLength = checkBox.length;
        for (let i = 0; i < checkBoxLength; i++) {
          checkBox[i].classList.add(errorClassNameCheckBox);
        }
        // ご予算の上限はwrapperの中を処理したいので別処理
      } else if (attr === 'js-validate-budget-wrapper') {
        const budgetInput = document.getElementById('js-validate-budget');
        budgetInput.classList.add(errorClassName);
        // その他の項目の通常の処理
      } else {
        this.inputObj.classList.add(errorClassName);
      }
      // クラスの設定2
      this.errorMsg.classList.add(
        InputCheck.ERROR_CLASS_NAME_PARAM.name1,
        this.uniqueClassName
      );
      this.errorMsgChild.classList.add(InputCheck.ERROR_CLASS_NAME_PARAM.name2);
      // ノードの生成
      this.errorMsgChild.textContent = this.errorMsgText;
      this.inputObj.parentNode.appendChild(this.errorMsg);
      this.errorMsg.appendChild(this.errorMsgChild);
      // 戻り値
      return this.errorMsg;
    }
  }

  // =============================================================
  // function
  // =============================================================

  // エラーメッセージのオブジェクトの生成／削除
  function controlErrorMsg(uniqueClassNameArg, errorMsgTextArg, inputObjArg) {
    // エラーメッセージが表示されている場合、現在のエラーメッセージを削除
    removeErrorMsg(inputObjArg);
    // 表示されていたエラーメッセージを削除後、新しいエラーメッセージを表示
    displayErrorMsg(uniqueClassNameArg, errorMsgTextArg, inputObjArg);
  }

  // 生成したエラーメッセージのオブジェクトを削除
  function removeErrorMsg(inputObject) {
    // バリデーションエラー時共通スタイル（_contact.scss）
    const errorClassName = 'contact__form--error';
    const errorClassNameCheckBox = 'contact__checkLabel--error';
    // エラーメッセージの有無の判定。エラーメッセージがあればエラーメッセージを削除
    if (inputObject.nextElementSibling !== null) {
      // 取得要素のid名での判定
      const attr = inputObject.getAttribute('id');
      // チェックボックスはwrapperの中を処理したいので別処理
      if (attr === 'js-validate-check-wrapper') {
        const checkBox = document.getElementsByClassName('contact__checkLabel');
        const checkBoxLength = checkBox.length;
        for (let i = 0; i < checkBoxLength; i++) {
          checkBox[i].classList.remove(errorClassNameCheckBox);
        }
        // ご予算の上限はwrapperの中を処理したいので別処理
      } else if (attr === 'js-validate-budget-wrapper') {
        const budgetInput = document.getElementById('js-validate-budget');
        budgetInput.classList.remove(errorClassName);
        // その他の項目の通常の処理
      } else {
        inputObject.classList.remove(errorClassName);
      }
      inputObject.nextElementSibling.remove();
    }
  }

  // エラーメッセージが表示されていない場合にエラーメッセージを表示
  function displayErrorMsg(uniqueClassNameArg, errorMsgTextArg, inputObjArg) {
    // ユニーククラスのオブジェクトの生成と取得
    const setUniqueClassObj = new SetUniqueClass(uniqueClassNameArg);
    const errorMsgShow = setUniqueClassObj.getUniqueClassName();
    // エラーメッセージの設定
    const inputCheckObj = new InputCheck(
      uniqueClassNameArg,
      inputObjArg,
      errorMsgTextArg
    );
    // エラーメッセージが表示されていない場合、エラーメッセージを表示
    if (errorMsgShow.length === 0) {
      inputCheckObj.createErrorMsg();
    }
  }
}
