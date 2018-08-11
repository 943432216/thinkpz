<?php
/**
 * Dsp注册验证
 */
namespace app\portal\validate;

use think\Validate;

class PortalDspValidate extends Validate
{
	protected $rule = [
		'dsp_name' => 'require|chsAlphaNum|max:50',
		'user_phone' => ['require','regex' => '/^1[345678]{1}\d{9}$/'],
		'user_pwd' => 'require|max:25',
		'user_pwds' => 'require|confirm:user_pwd',
		'codes' => 'require',
	]; 

	protected $message = [
		'dsp_name.require' => '用户名不能为空',
		'dsp_name.chsAlphaNum' => '用户名只能是汉字、字母和数字',
		'dsp_name.max' => '用户名在50个字以内',
		'user_phone.require' => '电话号码不能为空',
		'user_phone.regex' => '电话号码格式不对',
		'user_pwd.require' => '密码不能为空',
		'user_pwd.max' => '密码要在25位以内',
		'user_pwds.require' => '需要输入重复密码',
		'user_pwds.confirm' => '确认密码与原密码不一致',
		'codes.require' => '验证码不能为空',
	];
}